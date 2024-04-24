import useAuth from "../hooks/useAuth"
import { motion } from "framer-motion"
import { Separator } from "@/components/ui/separator"
import {
  Card,
  CardContent,
  // CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer , RadialBar, RadialBarChart, Legend} from 'recharts';

const result = [
          { sem: 'S1', sgpa: 7.88 },
          { sem: 'S2', sgpa: 8.1 },
          { sem: 'S3', sgpa: 8.55 },
          { sem: 'S4', sgpa: 9.76 },
          { sem: 'S5', sgpa: 9.17 },
          { sem: 'S6', sgpa: 9.2 },
          { sem: 'S7', sgpa: 8.9 }
        ];

const attendance = [
  { 
    name: "w-days" ,
    value : 100 ,
    fill:"#0000"
  },
  { 
    name: "present" ,
    value : 92 ,
    fill:"#66f542"
  },
]

function Dashboard() {
  const { auth } = useAuth()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      // exit={{ opacity: 0 }}
      transition={{duration: 0.2, ease:"easeOut"}}
      className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 auto-rows-[minmax(120px,auto)] gap-2 px-3"
    >
      <Card className="row-span-3">
        <CardHeader>
          <CardTitle>Notice</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            {
              ...Array(15).fill().map( ( key, i ) => 
                <>
                <div className="p-4 rounded-md my-2">
                  <p className="font-thin text-sm">20-04-24 :</p>
                  Officiis illo nihil assumenda nobis omnis quisquam magni. Adipisci sapiente dolorum nemo non voluptas minima eveniet. Est porro temporibus doloremque sapiente dolores omnis quam. Cupiditate quibusdam tenetur quo distinctio porro.
                </div>
                <Separator/>
                </>
              )
            }
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Vision</CardTitle>
        </CardHeader>
        <CardContent>
          producing intellectually well-equipped and socially committed citizens possessing an ethical value system.
        </CardContent>
      </Card>

      <Card className="row-span-2 md:col-span-2 lg:col-span-1">
        <CardHeader>
          <CardTitle>Attendance</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <ResponsiveContainer width="100%" height={200} >
            <RadialBarChart 
              innerRadius="40%" 
              outerRadius="80%" 
              data={attendance} 
              startAngle={360+90} 
              endAngle={90}
              >
              <RadialBar label={{ position: "center"}} clockWise={true} dataKey='value' />
              <Tooltip />
              <Legend/>
            </RadialBarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="md:col-span-3 lg:col-span-2 row-span-2">
        <CardHeader>
          <CardTitle>Results</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer  width="100%" height={300}>
            <LineChart data={result}>
              <Line type="monotone" dataKey="sgpa" stroke="#8884d8" />
              <CartesianGrid/>
              <XAxis dataKey="sem" />
              <YAxis/>
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

    </motion.div>
    
  )
}

export default Dashboard 