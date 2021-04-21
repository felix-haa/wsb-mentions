import {
  Line,
  LineChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { ChartDataInterface } from '../lib/types'

const Chart = ({
  data,
  dataKey,
}: {
  data: ChartDataInterface[]
  dataKey: string
}): JSX.Element => {
  return (
    <ResponsiveContainer width="80%" height={400} minWidth="0">
      <LineChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={dataKey} stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default Chart
