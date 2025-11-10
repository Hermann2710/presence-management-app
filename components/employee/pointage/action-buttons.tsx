import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

interface ActionButtonsProps {
  canCheckIn: boolean;
  canCheckOut: boolean;
  isPending: boolean;
  onCheckIn: () => void;
  onCheckOut: () => void;
}

export function ActionButtons({
  canCheckIn,
  canCheckOut,
  isPending,
  onCheckIn,
  onCheckOut,
}: ActionButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Button
        onClick={onCheckIn}
        disabled={!canCheckIn || isPending}
        className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
      >
        {isPending ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        ) : (
          <>
            <CheckCircle className="h-5 w-5 mr-2" />
            Check-in
          </>
        )}
      </Button>

      <Button
        onClick={onCheckOut}
        disabled={!canCheckOut || isPending}
        variant="outline"
        className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-3"
      >
        {isPending ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-600"></div>
        ) : (
          <>
            <XCircle className="h-5 w-5 mr-2" />
            Check-out
          </>
        )}
      </Button>
    </div>
  );
}
