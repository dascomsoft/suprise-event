import { createContext , useState} from "react";



export const FoodBoxtContext = createContext();

// Cart Provider
export const CartProvider =(props) =>{
  //useState foodBox
    const[foodBox, setFoodBox] = useState([])
   

       // ADD FOOD FUNCTION
    const add =(food) =>{
        //IF FOOD ALREADY EXIST IN THE CART
        const foodExist = foodBox.find((foodItem) => foodItem.id===food.id );

        if(foodExist){
             //IF FOOD EXIST 
            setFoodBox(foodBox.map((foodItem) => foodItem.id ===food.id ?  {...foodExist, quantity: foodExist.quantity + 1} : foodItem))
        }
         else{

            setFoodBox([...foodBox, {...food , quantity : 1}])
         }
    }

    //remove function
    const remove =(food)=>{
        //Check if the function already exist in the cart
        const foodExist = foodBox.find((foodItem) => foodItem.id===food.id );

          if(foodExist.quantity===1){

            setFoodBox(foodBox.filter((foodItem) => foodItem.id!==food.id))
          
        }
           else{
            setFoodBox(foodBox.map((foodItem) => foodItem.id===food.id ? {...foodExist , quantity : foodExist.quantity - 1} : foodItem))
           }
   
      }

      
      


      const clear =()=>{
        setFoodBox([])
      }
          
        const contextValue ={add,remove,foodBox,setFoodBox,clear}

      return(
        <FoodBoxtContext.Provider  value={contextValue}>
             {props.children}
        </FoodBoxtContext.Provider>
      )

}