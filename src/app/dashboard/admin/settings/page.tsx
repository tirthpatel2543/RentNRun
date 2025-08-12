import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Pricelist Management</CardTitle>
          <CardDescription>
            Customize pricing with multiple pricelists for different customer segments,
            time-dependent pricing, and discount rules.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                    <h3 className="font-semibold">Standard Pricelist</h3>
                    <p className="text-sm text-muted-foreground">Default prices for all customers.</p>
                </div>
                <Button variant="outline">Edit</Button>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                    <h3 className="font-semibold">VIP Customers</h3>
                    <p className="text-sm text-muted-foreground">Special discounts for loyal customers.</p>
                </div>
                <Button variant="outline">Edit</Button>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                    <h3 className="font-semibold">Weekend Special</h3>
                    <p className="text-sm text-muted-foreground">Promotional pricing for weekend rentals.</p>
                </div>
                <Button variant="outline">Edit</Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button className="gap-1">
            <PlusCircle className="h-4 w-4" />
            Create New Pricelist
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle>Late Fee Configuration</CardTitle>
            <CardDescription>Set automatic late fees or penalties for overdue returns.</CardDescription>
        </CardHeader>
        <CardContent>
            <form className="space-y-4">
                <div className="grid gap-2">
                    <Label htmlFor="late-fee-type">Fee Type</Label>
                    <Input id="late-fee-type" defaultValue="Fixed Amount" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="late-fee-amount">Amount ($)</Label>
                    <Input id="late-fee-amount" type="number" defaultValue="25" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="grace-period">Grace Period (in hours)</Label>
                    <Input id="grace-period" type="number" defaultValue="2" />
                </div>
            </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
            <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
