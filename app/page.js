import { Readex_Pro, Roboto } from 'next/font/google';
import Navbar from "@/components/navbar/navbar";
import Search from "@/components/search/search";
import Subdesc from "@/components/subscriptiondescription/subdesc";
import classes from './page.module.css';
import { Fragment } from "react";
import Mainpageproperties from "@/components/property/mainpageproperties";
import Bigbutton from "@/components/bigbutton/bigbutton";
import Footer from "@/components/footer/footer";
import { getHomeFeed } from '@/lib/home-feed';
const Readex_Pro_Font = Readex_Pro(
  {
    subsets: ['arabic'],
    weight: "400"
  }
);


export default async function Home() {
  // const { exclusive, special } = await getHomeFeed();
  // console.log(exclusive, special);

  return (
    <Fragment>

      <div className={`${classes.background} ${Readex_Pro_Font.className}`}>
        <Navbar mainpage={true} />
        <Search />
        {/* <Mainpageproperties    /> */}
        <Bigbutton buttontext='إظهار المزيد من العقارات المميزة' />
        <Subdesc />
        <Footer />
      </div>
    </Fragment>);
}
