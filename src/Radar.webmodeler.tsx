import { Component, ReactNode, createElement } from "react";
import { RadarContainerProps, RadarPreviewProps } from "../typings/RadarProps";

declare function require(name: string): string;

export class preview extends Component<RadarPreviewProps> {
    render(): ReactNode {
        return <div>No preview available</div>;
    }
}

export function getPreviewCss(): string {
    return require("./ui/index.scss");
}
type VisibilityMap = {
    [P in keyof RadarContainerProps]: boolean;
};

export function getVisibleProperties(props: RadarContainerProps, visibilityMap: VisibilityMap): VisibilityMap {
    // visibilityMap.nodeConstraint = props.nodeDataSource === "xpath";
    // visibilityMap.nodeGetDataMicroflow = props.nodeDataSource === "microflow";
    // visibilityMap.nodeGetDataNanoflow = props.nodeDataSource === "nanoflow";
    console.log(props);

    return visibilityMap;
}
