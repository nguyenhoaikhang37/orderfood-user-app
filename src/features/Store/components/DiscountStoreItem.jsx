import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const DiscountStoreItem = ({ store }) => {
  return (
    <Card sx={{ minWidth: 200 }}>
      <Link to={`/detail/${store.restaurant._id}`}>
        <CardActionArea>
          <CardMedia component="img" sx={{ height: '100px !important' }} image={store.photo} />
          <CardContent>
            <Typography gutterBottom variant="body1" sx={{ fontWeight: 'bold' }} component="div">
              {store.nameDiscount}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Từ cửa hàng: {store.restaurant.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default DiscountStoreItem;
