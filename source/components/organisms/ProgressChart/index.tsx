import { FunctionComponent } from "react";
import { useWindowDimensions } from "react-native";
import { LineChart, LineChartPropsType } from "react-native-gifted-charts";


export interface ProgressChartProps extends Omit<LineChartPropsType, "data"> {
    data: LineChartPropsType["data"];
}

export const ProgressChart: FunctionComponent<ProgressChartProps> = (props) => {
    const { width } = useWindowDimensions();

    const chartConfig = {
        width: width - 80,
        adjustToWidth: true,
        endSpacing: 0,
        initialSpacing: 0,
        xAxisLabelTextStyle: { color: '#515254' },
        color: '#61646B',
        color2: '#2C2C2C',
        thickness2: 1,
        strokeDashArray2: [4, 4] as [number, number],
        hideDataPoints: true,
        thickness: 3,
        curved: true,
        rulesColor: '#D7DBE7',
        xAxisColor: '#E1E9EE',
        yAxisColor: '#E1E9EE',
        yAxisTextStyle: { color: '#7B7B7B' },
        noOfSections: 4,
        yAxisOffset: 60,
        textFontSize: 14,
        isAnimated: true,
    };

    return <LineChart {...chartConfig} {...props} />;
};