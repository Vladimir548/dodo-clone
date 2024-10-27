import Container from "@/components/shared/Container";
import HeaderLogo from "@/components/shared/header/HeaderLogo";
import HeaderSearch from "@/components/shared/header/HeaderSearch";
import HeaderButtons from "@/components/shared/header/HeaderButtons";
import SwitchTheme from "@/components/shared/SwitchTheme";

export default function Header() {
    return (
        <header className={'border-b dark:border-primary/30 '}>
            <Container className={'py-8 flex justify-between gap-x-4   items-center '}>

                <HeaderLogo/>
                <HeaderSearch/>
                <HeaderButtons/>

            </Container>
            <div className={'absolute right-5 py-11 top-0 '}><SwitchTheme/></div>

        </header>
    );
};