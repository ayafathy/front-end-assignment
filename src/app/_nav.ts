
export const navItems: INavData[] = [

  { index: 1,
    name: 'Posts',
    children: [
      {
        Previligeid: 34,
        name: 'posts',
        url: '/post/posts',
      }]}
 

];


export class INavData {
  index?: number;
  name?: string;
  url?: string | any[];
  href?: string;
  icon?: string;
  title?: boolean;
  children?: INavData[];
  Previligeid?: number;
}
