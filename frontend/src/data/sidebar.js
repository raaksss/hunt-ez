import { FaTh, FaRegChartBar, FaCommentAlt } from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";
import {GrFormEdit} from "react-icons/gr";
import {CgProfile} from "react-icons/cg";

const menu = [
  {
    title: "Dashboard",
    icon: <FaTh />,
    path: "/dashboard",
  },
  {
    title: "Add Product",
    icon: <BiImageAdd />,
    path: "/add-product",
  },
  {
    title: "Account",
    icon: <FaRegChartBar />,
    childrens: [
      {
        title: "Profile",
        path: "/profile",
        icon:<CgProfile />

        
      },
      {
        title: "Edit Profile",
        path: "/edit-profile",
        icon:<GrFormEdit />
      },
    ],
  },
];

export default menu;