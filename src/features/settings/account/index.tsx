import ContentSection from "../components/ContentSection";
import AccountForm from "./AccountForm";

export default function SettingsAppearance() {
  return (
    <ContentSection
      title="Account Information"
      desc="Customize the appearance of the app. Automatically switch between day
          and night themes."
    >
      <AccountForm />
    </ContentSection>
  );
}
