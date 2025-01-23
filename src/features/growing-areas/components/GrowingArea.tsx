import { useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import growingAreaService from "../services/growingAreaService";
import { GrowingAreaRes } from "../types/index";
import { useTranslation } from "react-i18next";
import GrowingAreaEditorDialog from "./GrowingAreaEditorDialog";
import GrowingAreaTreatments from "./GrowingAreaTreatments";

const GrowingArea = () => {
  const params = useParams({
    from: "/_authenticated/growing-areas/$growingAreaId",
  });

  const growingAreaId = Number(params.growingAreaId);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showProduceUpdate, setShowProduceUpdate] = useState<boolean>(false);
  const [growingArea, setGrowingArea] = useState<GrowingAreaRes>();
  const { t } = useTranslation(["global", "produce"]);

  const fetchData = async () => {
    try {
      const response =
        await growingAreaService.getGrowingAreaById(growingAreaId);
      setGrowingArea(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onCloseDialog = async () => {
    setShowProduceUpdate(false);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        await fetchData();
      } catch (error) {
        console.error("Error fetching produce details:", error);
        // Handle error here - maybe set an error state
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, []);

  if (isLoading) {
    return <div>is Loading..</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-6">
      {/* Left section: Produce information */}
      <section>
        {/* <ProduceCard
          item={produce}
          onUpdate={() => setShowProduceUpdate(true)}
        /> */}
        <GrowingAreaEditorDialog
          isOpen={showProduceUpdate}
          onClose={onCloseDialog}
          item={growingArea}
          refetch={fetchData}
        />
      </section>

      {/* Right section: Tables */}
      <section className="col-span-2 space-y-4">
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <GrowingAreaTreatments growingAreaId={growingAreaId} />
        </div>
      </section>
    </div>
  );
};

export default GrowingArea;
