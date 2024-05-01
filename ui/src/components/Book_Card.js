import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';


 
function Book_Card({key,book,height}) {
  const navigate = useNavigate();
  const price=Number(book.price*100)
  console.log(book)
  const HandleClick=(e)=>{
    navigate(`/items/${book._id}`)
  }

  return (
    <Card className='hover:scale-105'>
      <CardHeader shadow={false} floated={false} className="h-96">
        <img
          src={book.images[0]?.large}
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <div className="mb-2 flex items-center justify-between">
          <Typography color="blue-gray" className="font-medium">
           {book.title}
          </Typography>
          {/* <Typography color="blue-gray" className="font-medium">
          Rs<b>{price}</b>
          </Typography> */}
        </div>
        <Typography
          variant="small"
          color="gray"
          className="font-normal opacity-75"
        >
 
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button 
          ripple={false}
          fullWidth={true}
          className="bg-orange-400 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
    onClick={HandleClick}   >
         Buy Now
        </Button>
      </CardFooter>
    </Card>

    
  );
}

export default Book_Card;