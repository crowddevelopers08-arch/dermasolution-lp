import { Input } from "@/component/ui/input"
import { Label } from "@/component/ui/label"

interface DateRangePickerProps {
  defaultFrom?: string
  defaultTo?: string
}

export function DateRangePicker({ defaultFrom, defaultTo }: DateRangePickerProps) {
  return (
    <div className="flex gap-2">
      <div className="flex-1">
        <Label htmlFor="dashboard-date-from" className="mb-1 block text-xs text-muted-foreground">
          From
        </Label>
        <Input id="dashboard-date-from" type="date" name="dateFrom" defaultValue={defaultFrom} className="h-11" />
      </div>
      <div className="flex-1">
        <Label htmlFor="dashboard-date-to" className="mb-1 block text-xs text-muted-foreground">
          To
        </Label>
        <Input id="dashboard-date-to" type="date" name="dateTo" defaultValue={defaultTo} className="h-11" />
      </div>
    </div>
  )
}
