import TopBar from "@/components/shared/top-bar/TopBar";
import Filter from "@/components/shared/filters/Filter";
import Container from "@/components/shared/Container";



export default function Home() {
    return (
        <main>
            <TopBar/>
            <div className={'pt-5'}>
                <Container className={'flex gap-x-[60px]'}>
                    <div>
                        <Filter/>
                    </div>
                    <div className="">
                        food
                    </div>
                </Container>
            </div>
        </main>
    );
}
