import Container from "@/components/shared/Container";
import TopBar from "@/components/shared/top-bar/TopBar";
import HomePage from "./Home";

export default function Home() {
  return (
    <>
      <TopBar />
      <div className={"pt-5"}>
        <Container>
          <HomePage />
        </Container>
      </div>
    </>
  );
}
