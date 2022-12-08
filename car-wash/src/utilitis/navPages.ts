
import dashboard from "../../public/dashboard.svg"
import calendar from "../../public/calendar.svg"
import chart from "../../public/chart.svg"
import users from "../../public/users.svg"

interface INavPages {
  id: number;
  pageName: string;
  icon:string;
  link: string;
}
/* interface INavPages extends Array<INavPages> {} */


export const navPage: INavPages[] = [
  {
    id: 1,
    pageName: "Lavados",
    icon: calendar,
    link: "/lavados",
  },
  {
    id: 2,
    pageName: "Reporte de ventas",
    icon: chart,
    link: "/reportes",

  },
  {
    id: 3,
    pageName: "Lavadores",
    icon: users,
    link: "/lavadores",

  },
  {
    id: 4,
    pageName: "Dashboard",
    icon: dashboard,
    link: "/",
  },
];
