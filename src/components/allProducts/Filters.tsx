import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { setCategory, resetFilters } from "@/redux/slices/filtersSlice";
import { BrandFilters } from "./BrandFilters";
import { PriceFilter } from "./PriceFilter";
import { ColorFilters } from "./ColorFilters";
import { RatingFilters } from "./RatingFilters";

import ProductAD from "@/assets/images/productsAD.png";

import { Link } from "react-router-dom";
type CategoryfilterContent = {
  title: string;
  amount: number;
};

type CategoryFilter = CategoryfilterContent[];

const categoryFilters: CategoryFilter = [
  {
    title: "الإلكترونيات والموبايلات",
    amount: 100,
  },
  {
    title: "التلفزيونات والشاشات",
    amount: 100,
  },
  {
    title: "سماعات أذن",
    amount: 100,
  },
  {
    title: "كاميرات ديجتال",
    amount: 100,
  },
  { title: "مكبرات صوت", amount: 100 },
];

export const Filters = () => {
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector((state) => state.filters.category);

  const handleCategoryChange = (category: string) => {
    if (category === "All") {
      dispatch(setCategory("All"));
    } else {
      dispatch(setCategory(category));
    }
  };

  return (
    <div className="hidden lg:block md:w-[342px] border border-content-muted my-14">
      <Accordion
        type="multiple"
        dir="rtl"
        defaultValue={["item-1", "item-2", "item-3"]}
      >
        {/* category */}
        <AccordionItem value="item-1" className="p-4">
          <AccordionTrigger className="text-[16px] font-medium text-content-dark">
            الفئة
          </AccordionTrigger>
          <AccordionContent className="border-b">
            <ul>
              <li>
                <form action="submit" className="flex flex-col gap-2">
                  {/* All button */}
                  <label className="flex items-center gap-2 justify-start mb-2">
                    <input
                      type="checkbox"
                      name="category"
                      className="appearance-none w-[18px] h-[18px] rounded-full border border-gray-400 checked:bg-accent-primary"
                      checked={selectedCategory === "All"}
                      onChange={() => handleCategoryChange("All")}
                    />
                    الكل
                    <p className="justify-self-end mr-auto">(1000)</p>
                  </label>

                  {/* other filters */}
                  {categoryFilters.map((filter, index) => (
                    <label key={index} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="category"
                        className="appearance-none w-[18px] h-[18px] rounded-full border border-gray-400 checked:bg-accent-primary"
                        checked={selectedCategory === filter.title}
                        onChange={() => handleCategoryChange(filter.title)}
                      />
                      <p className="text-sm text-content-dark">
                        {filter.title}
                      </p>
                      <p className="justify-self-end mr-auto">
                        ({filter.amount})
                      </p>
                    </label>
                  ))}
                </form>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/* Brand */}
        <BrandFilters />

        {/* Price */}
        <PriceFilter />

        {/* Color */}
        <ColorFilters />

        {/* Rating */}
        <RatingFilters />

        {/* Filter button */}
        <button
          className="py-2.5 text-sm font-normal text-center text-content-dark border border-content-dark w-full rounded-sm hover:bg-accent-primary-hover hover:text-white hover:border-accent-primary-hover mb-2"
          onClick={() => dispatch(resetFilters())}
        >
          اعادة ضبط
        </button>
      </Accordion>

      <div className="mt-4 relative">
        <img src={ProductAD} alt="" />
        <div className="absolute top-6 right-6 flex flex-col text-start">
          <p className="text-body-base font-body-regular text-content-muted">
            سماعات ديجتال
          </p>
          <h3 className="text-heading-large font-heading-medium text-white">
            افضل صوت نقي
          </h3>
          <Link
            to="/products"
            className="text-body-base text-start text-white font-medium hover:underline"
          >
            تسوق الان
          </Link>
        </div>
      </div>
    </div>
  );
};
