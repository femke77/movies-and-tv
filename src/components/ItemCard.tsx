interface ItemCardProps {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  vote_average: number;
  poster_path: string;
}

const ItemCard = ({ item }: { item: ItemCardProps }) => {
  return <div>{item.title}</div>;
};

export default ItemCard;
