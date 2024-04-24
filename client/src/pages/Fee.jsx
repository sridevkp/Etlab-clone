import { motion } from "framer-motion"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { useState, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import useRazorpay from "react-razorpay";
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import { title } from "process"

function Fee() {
  const axiosPrivate = useAxiosPrivate()
  const [ Razorpay ] = useRazorpay();
  const [ dues, setDues ] = useState()
  const [ receipts, setReceipts ] = useState()
  const {toast} = useToast()

  useEffect( () => {
    const fetchData = async () => {
      try{
        const res = await axiosPrivate.get(`/users/fees`)
        setDues( res.data.dues ) 
        setReceipts( res.data.receipts )
      }catch( err ){
        console.log( err )
      }
    }
    fetchData()
  },[])

  const handlePayment = async fee => {
    try{
      const data = await axiosPrivate.post( "/api/fees/order",{ id: fee._id })
      
      const order = data.data.order
      const options = {
        key : "rzp_test_mSTAAlRhETQlTu",
        amount : order.amount,
        currency:"INR",
        name: "ETlabs",
        description: fee.description||fee.discription,
        order_id : order.id,
        handler: async res => {
          res = {
            fee_id : fee._id,
            ...res
          }
          try{
            const data = await axiosPrivate.post("/api/fees/verify", res )
            toast({ title: data.data })
          }catch( err ){
            toast({ title: "Couldnt verify payment", variant: "destructive"})
            console.log( err )
          }  
        }
      }
      const razor = new Razorpay( options )
      razor.on("payment.failed", res => {
        console.log( res.error )
        toast({ title: "Payment failed", variant: "destructive"})
      });
      razor.open()
          
    }catch( err ){
      toast({ title: "Something went wrong", description: err.message, variant:"destructive"})
      console.log( err )
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{duration: 0.2, ease:"easeOut"}}
      className="grid gap-2 p-2"
    >
      <Toaster/>
      <Card>
      {
        !dues?.length
        ?<CardHeader>
          <CardTitle>
            No Dues
          </CardTitle>
        </CardHeader>
        :<>
          <CardHeader>
            <CardTitle>
              Dues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table className="p-2">
              <TableCaption>Fee due</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Issued</TableHead>
                  <TableHead>Due</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dues.map( ( due, i )  => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{ due.description||due.discription }</TableCell>
                    <TableCell>{ new Date(due.issuedOn).toDateString() }</TableCell>
                    <TableCell>{ new Date(due.due).toDateString() }</TableCell>
                    <TableCell className="font-medium">₹ {due.amt}</TableCell>
                    <TableCell className="font-medium">
                      <Button onClick={()=> handlePayment( due )}>Pay now</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </>
      }
      </Card>
      <Card>
        {
        !receipts?.length
        ?<CardHeader>
          <CardTitle>
            No Receipts
          </CardTitle>
        </CardHeader>
        :<>
          <CardHeader>
            <CardTitle>
              Receipts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table className="p-2">
              <TableCaption>Fee Receipts</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Mode</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {receipts.map( ( receipt, i )  => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{ receipt.fee.description||receipt.fee.discription }</TableCell>
                    <TableCell>{ new Date(receipt.date).toDateString() }</TableCell>
                    <TableCell>{ receipt.mode }</TableCell>
                    <TableCell className="font-medium">₹ { receipt.fee.amt }</TableCell>
                    <TableCell className="font-medium">
                      <Button>View</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </>
      }
      </Card>
      
    </motion.div>
  )
}

export default Fee