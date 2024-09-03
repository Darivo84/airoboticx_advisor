import { useState, useEffect } from "react";
import { Box, useMediaQuery } from '@mui/material';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  AreaChart,
  Area,
  Bar,
  BarChart
} from 'recharts';
import DashboardBox from "../components/DashboardBox";
import BoxHeader from "../components/BoxHeader";
import { useTheme } from "@mui/material";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const { palette } = useTheme();

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');

    socket.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    socket.onmessage = (event) => {
      const receivedData = JSON.parse(event.data);
      if (receivedData.error) {
        console.error('Error:', receivedData.error);
      } else {
        const formattedData = receivedData.map(item => ({
          timestamp: new Date(item.Timestamp).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
          }), 
          open: item.Open,
          high: item.High,
          low: item.Low,
          close: item.Close,
        }));
        setData(formattedData);
      }
    };

    socket.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    return () => {
      socket.close();
    };
  }, []);

  console.log("predictions data: ", data)

  return (
    <>
      <Box 
        width="100%" 
        height="100%" 
        padding="20px"
        gap="1.5rem"
      >
        <DashboardBox style={{ padding: '10px', marginTop: "5%"}}>
          <BoxHeader
            title="High and Low"
            subtitle="High and Low values present for the day"
            // sideText="+4%"
          />
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                width="90%"
                height="90%"
                marginLeft="-15px"
                data={data} 
                margin={{
                  top: 20,
                  right: 0,
                  left: -10,
                  bottom: 55,
                }}
              >
                 <CartesianGrid vertical={false} stroke={palette.grey[800]} />
                <XAxis 
                  dataKey="timestamp"
                  tickLine={false}
                  style={{ fontSize: "10px" }}
                />
                <YAxis 
                  tickLine={false}
                  axisLine={false}
                  style={{ fontSize: "10px" }}
                />
                <Tooltip />
                <Legend
                  height={20}
                  wrapperStyle={{
                    margin: "0 0 10px 0",
                  }}
                />
                <Line type="monotone" dataKey="high" stroke={palette.tertiary[500]} />
                <Line type="monotone" dataKey="low" stroke={palette.primary.main} />
              </LineChart>
            </ResponsiveContainer>
        </DashboardBox>

        <DashboardBox>
          <BoxHeader
            title="Open and Close"
            subtitle="Openning and Closing values present for the day"
            // sideText="+4%"
          />
          {/* <br /> */}
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={data}
              margin={{
                top: 20, right: 30, left: 20, bottom: 20,
              }}
              >
                <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={palette.primary[300]}
                    stopOpacity={0.5}
                  />
                  <stop
                    offset="95%"
                    stopColor={palette.primary[300]}
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={palette.primary[300]}
                    stopOpacity={0.5}
                  />
                  <stop
                    offset="95%"
                    stopColor={palette.primary[300]}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="timestamp" 
                  tickLine={false}
                  style={{ fontSize: "10px" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={{ strokeWidth: "0" }}
                  style={{ fontSize: "10px" }}
                  domain={[8000, 23000]}
                />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="open"
                dot={true}
                stroke="#d0fcf4"
                fillOpacity={1}
                fill="url(#colorRevenue)"
                />
              <Area
                type="monotone"
                dataKey="close"
                dot={true}
                stroke={palette.primary.main}
                fillOpacity={1}
                fill="url(#colorExpenses)"
                />
              <CartesianGrid strokeDasharray="3 3" />
            </AreaChart>
          </ResponsiveContainer>
        </DashboardBox>
        
        {/* <DashboardBox>
          <BoxHeader
            title="Open and Close"
            subtitle="Openning and Closing values present for the day"
          />
          <ResponsiveContainer width="100%" height={250}>
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 17,
              right: 15,
              left: -5,
              bottom: 58,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="TImestamp"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Bar dataKey="Volume" />
          </BarChart>
          </ResponsiveContainer>
        </DashboardBox> */}
      </Box>
    </>
  )
}

export default Dashboard