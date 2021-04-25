import {
  Bar,
  BarChart,
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
  className,
}: {
  data: ChartDataInterface[]
  dataKey: string
  className?: string
}): JSX.Element => {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={400} minWidth="0">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis width={20} />
          <Tooltip />
          <Legend />
          <Bar dataKey={dataKey} fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart
