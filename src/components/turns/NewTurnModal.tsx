
import React, { useState, useEffect } from "react";
import { format, addDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { TurnFormData, Turn } from "./types";
import { sampleDrivers } from "@/data/sampleDrivers";

// Time slots from 5 AM to 6 PM
const TIME_SLOTS = [
  "05:00 AM", "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"
];

// Form schema with validation
const formSchema = z.object({
  driverId: z.string({
    required_error: "Please select a driver",
  }),
  route: z.string({
    required_error: "Please select a route",
  }),
  departureDate: z.date({
    required_error: "Please select a departure date",
  }),
  departureTime: z.string({
    required_error: "Please select a departure time",
  }),
  numberOfPassengers: z.number({
    required_error: "Please enter number of passengers",
  }).min(1, "At least 1 passenger required").max(50, "Maximum 50 passengers allowed"),
});

interface NewTurnModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTurn: (turn: Turn) => boolean;
  availableRoutes: string[];
}

const NewTurnModal: React.FC<NewTurnModalProps> = ({ 
  isOpen, 
  onClose, 
  onAddTurn,
  availableRoutes 
}) => {
  // Set up min and max date (today to 14 days from now)
  const today = new Date();
  const maxDate = addDays(today, 14);
  
  const form = useForm<TurnFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      driverId: "",
      route: "",
      departureDate: today,
      departureTime: "",
      numberOfPassengers: 1
    },
  });

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      form.reset({
        driverId: "",
        route: "",
        departureDate: today,
        departureTime: "",
        numberOfPassengers: 1
      });
    }
  }, [isOpen, form]);

  const onSubmit = (data: TurnFormData) => {
    // Find the selected driver to get their details
    const selectedDriver = sampleDrivers.find(driver => driver.id.toString() === data.driverId);
    
    if (!selectedDriver) {
      form.setError("driverId", {
        type: "manual",
        message: "Invalid driver selection"
      });
      return;
    }
    
    // Create a new turn with the form data
    const newTurn: Turn = {
      id: `turn_${Date.now()}`,
      driverId: data.driverId,
      driverName: selectedDriver.fullName,
      phoneNumber: selectedDriver.phoneNumber,
      route: data.route,
      departureDate: format(data.departureDate, "yyyy-MM-dd"),
      departureTime: data.departureTime,
      turnNumber: "1st Turn", // This could be calculated based on existing turns
      numberOfPassengers: data.numberOfPassengers
    };
    
    const success = onAddTurn(newTurn);
    if (success) {
      onClose();
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Turn</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Driver Selection */}
            <FormField
              control={form.control}
              name="driverId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Driver</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a driver" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sampleDrivers.map(driver => (
                        <SelectItem key={driver.id} value={driver.id.toString()}>
                          {driver.fullName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Route Selection */}
            <FormField
              control={form.control}
              name="route"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Route</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a route" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableRoutes.map(route => (
                        <SelectItem key={route} value={route}>
                          {route}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Departure Date */}
            <FormField
              control={form.control}
              name="departureDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Departure Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => 
                          date < today || 
                          date > maxDate
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Departure Time */}
            <FormField
              control={form.control}
              name="departureTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Departure Time</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a time" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TIME_SLOTS.map(time => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Number of Passengers */}
            <FormField
              control={form.control}
              name="numberOfPassengers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Passengers</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      max={50}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-green-800 hover:bg-green-700">
                Create Turn
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewTurnModal;
