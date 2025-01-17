import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpCircle, Package2 } from "lucide-react";
import { ProduceRes } from "../types";

type Props = {
  item: ProduceRes;
  onUpdate: () => void;
};

const ProduceCard = ({ item, onUpdate }: Props) => {
  return (
    <Card className="w-full max-w-lg overflow-hidden bg-gradient-to-br from-white to-gray-50 border-none shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Decorative top border */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

      <CardHeader className="space-y-3 pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <Package2 className="h-6 w-6 text-blue-500" />
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {item.name}
            </CardTitle>
          </div>
          <Badge
            variant="secondary"
            className="py-1 px-3 bg-blue-100 text-blue-700 rounded-full"
          >
            {item.id}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex items-center justify-between px-4 py-3 bg-blue-50 rounded-lg">
          <span className="text-sm font-medium text-gray-600">
            Last Updated
          </span>
          <span className="text-sm font-semibold text-blue-600">
            {/* {new Date(lastUpdate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })} */}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 px-1">
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-green-400" />
            <span>Active Status</span>
          </div>
          <span className="text-green-600 font-medium">In Stock</span>
        </div>
      </CardContent>

      <CardFooter className="pt-4">
        <Button
          onClick={onUpdate}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <ArrowUpCircle className="h-5 w-5" />
          <span>Update Produce</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProduceCard;
