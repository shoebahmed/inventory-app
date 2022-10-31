import { INewProduct } from "./types";
import dayjs from "dayjs";

export const recentProductList: INewProduct[] = [
    {
      id:11, 
      category:"Electronic Products",
      location: "Flat 402",
      quantity: 1,
      description: "IPhone 14 pro max purchased from MediaMarkt on 12-Oct-22",
      image: 'https://www.apple.com/v/iphone-14-pro/b/images/overview/hero/hero_endframe__cvklg0xk3w6e_large.jpg',
    },
    {
      id:12, 
      category:"Home Appliances",
      location: "Flat 403",
      quantity: 10,
      description: "Juicer Grinder",
      image: 'https://hamiltonbeach.in/media/juicer-mixer-grinder/58770-IN.jpg',
    },
    {
      id:13, 
      category:"Industrial",
      location: "Flat 402",
      quantity: 10,
      description: "Hayabusa Bike Sensor",
      image: 'https://m.media-amazon.com/images/I/419DrFE3e9L._SX355_.jpg',
    },
  ]

  export const electronicProductList: INewProduct[] = [
    {
      id:14, 
      category: "Electronic Products",
      location: "Flat 402",
      quantity: 1,
      timestamp: 22,
      description: "IPhone 14 pro max purchased from MediaMarkt on 12-Oct-22",
      image: 'https://www.apple.com/v/iphone-14-pro/b/images/overview/hero/hero_endframe__cvklg0xk3w6e_large.jpg',
    },
    {
      id:15, 
      category: "Electronic Products",
      location: "Flat 403",
      quantity: 10,
      description: "Asus Tuf Gaming Laptop",
      image: 'https://i3.ytimg.com/vi/oHpwoC-NHNQ/maxresdefault.jpg',
    },
    {
      id:16, 
      category: "Electronic Products",
      location: "Flat 40",
      quantity: 10,
      description: "Boat Airdopes delivered",
      image: 'https://img.onmanorama.com/content/dam/mm/en/news/business/images/2021/1/6/boat-company-logo.jpg',
    },
  ]

  export const homeApplianceProductList: INewProduct[] = [
    {
      id:17, 
      category:"Home Appliances",
      location: "Flat 402",
      quantity: 1,
      timestamp: dayjs().unix(),
      description: "LG Refrigerator purchased from LG Store",
      image: 'https://www.lg.com/in/images/refrigerators/md06172459/gallery/GC-X247CQAV-Refrigerators-Food-DID-Open-D-02.jpg',
    },
    {
      id:18, 
      category:"Home Appliances",
      location: "Flat 403",
      quantity: 10,
      description: "Juicer Grinder",
      image: 'https://hamiltonbeach.in/media/juicer-mixer-grinder/58770-IN.jpg',
    },
    {
      id:19, 
      category:"Home Appliances",
      location: "Flat 40",
      quantity: 10,
      description: "",
      image: 'https://images.unsplash.com/photo-1604998103924-89e012e5265a?fit=crop&w=450&q=80',
    },
  ]

  export const industrialProductList: INewProduct[] = [
    {
      id:20, 
      category:"Industrial Products",
      location: "Flat 402",
      quantity: 5,
      description: "Hayabusa Bike Sensor delivered",
      image: 'https://m.media-amazon.com/images/I/419DrFE3e9L._SX355_.jpg',
    },
    {
      id:21, 
      category:"Industrial Products",
      location: "Flat 403",
      quantity: 10,
      description: "Pumps, Pumping Machines & Spares",
      image: 'https://images.unsplash.com/photo-1604998103924-89e012e5265a?fit=crop&w=450&q=80',
    },
    {
      id:22, 
      category:"Industrial Products",
      location: "Flat 40",
      quantity: 10,
      description: "Pumps, Pumping Machines & Spares",
      image: 'https://images.unsplash.com/photo-1604998103924-89e012e5265a?fit=crop&w=450&q=80',
    },
  ]

  export const General: INewProduct[] = [
    {
      id:20, 
      category:"General Products",
      location: "Flat 402",
      quantity: 4,
      description: "Ear drops and Nasal drops",
      image: 'https://cms-contents.pharmeasy.in/offer/f99f81a36bd-1X1_Log_PE.png',
    },
    {
      id:21, 
      category:"General Products",
      location: "Flat 403",
      quantity: 5,
      description: "Dry Cough Syrups",
      image: 'https://images.unsplash.com/photo-1604998103924-89e012e5265a?fit=crop&w=450&q=80',
    },
    {
      id:22, 
      category:"General Products",
      location: "Flat 40",
      quantity: 10,
      description: "Axe Deodrants",
      image: 'https://images.unsplash.com/photo-1604998103924-89e012e5265a?fit=crop&w=450&q=80',
    },
  ]