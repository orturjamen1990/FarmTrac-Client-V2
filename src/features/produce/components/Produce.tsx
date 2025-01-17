import { useParams } from "@tanstack/react-router";
import ProduceEditorDialog from "./ProduceEditorDialog";
import { useEffect, useState } from "react";
import produceService from "../services/produceService";
import { ProduceRes } from "../types/index";
import { useTranslation } from "react-i18next";
import ProduceSpecies from "./ProduceSpecies";
import ProduceSize from "./ProduceSizes";
import ProduceCard from "./ProduceCard";

const Produce = () => {
  const params = useParams({
    from: "/_authenticated/produces/$produceId",
  });

  const produceId = Number(params.produceId);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showProduceUpdate, setShowProduceUpdate] = useState<boolean>(false);
  const [produce, setProduce] = useState<ProduceRes>();
  const { t } = useTranslation(["global", "produce"]);

  const getProduceDetails = async () => {
    try {
      const response = await produceService.getProduceById(produceId);
      setProduce(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onCloseDialog = async () => {
    setShowProduceUpdate(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await getProduceDetails();
      } catch (error) {
        console.error("Error fetching produce details:", error);
        // Handle error here - maybe set an error state
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>is Loading..</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-6">
      {/* Left section: Produce information */}
      <section>
        <ProduceCard
          item={produce}
          onUpdate={() => setShowProduceUpdate(true)}
        />
        <ProduceEditorDialog
          isOpen={showProduceUpdate}
          onClose={onCloseDialog}
          item={produce}
          refetch={getProduceDetails}
        />
      </section>

      {/* Right section: Tables */}
      <section className="col-span-2 space-y-4">
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <ProduceSpecies produceId={produceId} />
        </div>

        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <ProduceSize produceId={produceId} />
        </div>
      </section>
    </div>
  );
};

export default Produce;
