import {Fragment, useContext} from "react";
import AuthContext from "@/Contexts/AuthContext";
import MainSlider from "@/Components/Public/MainSlider";
import MenuContext from "@/Contexts/MenuContext";
import SearchAndCategory from "@/Components/Public/SearchAndCategory";
import TopNewsSection from "@/Components/Public/TopNewsSection";
import HotNewsSection from "@/Components/Public/HotNewsSection";
import HotVideoItem from "@/Components/Public/HotVideoItem";
import HotVideoSection from "@/Components/Public/HotVideoSection";
import NewsByCategorySection from "@/Components/Public/NewsByCategorySection";
import CompanySection from "@/Components/Public/CompanySlider";
import CompanySlider from "@/Components/Public/CompanySlider";
import SocialLinkSection from "@/Components/Public/socialLinkSection";
import App from "@/pages/_app";
import HotCategorySection from "@/Components/Public/HotCategorySection";
import SearchInputSection from "@/Components/Public/SearchInputSection";


export default function Home({data}) {
    console.log(data)
    return (
        <Fragment>
            <MainSlider sliders={data.data.sliders}></MainSlider>
            <div className={"container mt-4"}>
                <div className="d-flex flex-row flex-wrap justify-content-between gap-2">
                    <HotCategorySection data={data.data.most_visited_categories}></HotCategorySection>
                    <SearchInputSection></SearchInputSection>
                </div>
            </div>
            <TopNewsSection data={data.data.selected_posts}></TopNewsSection>
            <HotNewsSection data={data.data.most_visited_posts}></HotNewsSection>
            <HotVideoSection data={data.data.most_visited_videos}></HotVideoSection>
            <NewsByCategorySection></NewsByCategorySection>
            <CompanySlider data={data.data.selected_companies}></CompanySlider>
            <SocialLinkSection></SocialLinkSection>
        </Fragment>
    )
}


export async function getServerSideProps() {
    const dataRes = await fetch(`https://newsapi.deltagroup.ir/front/home`)
    const data = await dataRes.json()
    if(!data.status){
        return {
            notFound : true
        }
    }
    return { props: { data } };
}
