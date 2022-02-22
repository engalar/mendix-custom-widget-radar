/**
 * This file was generated from Cascader.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { CSSProperties } from "react";
import { EditableValue } from "mendix";

interface CommonProps {
    name: string;
    class: string;
    tabIndex: number;

    uniqueid: string;
    friendlyId?: string;
    mxform: mxui.lib.form._FormBase;
    mxObject?: mendix.lib.MxObject;
    readOnly: boolean;
    style: string;
}

interface _W {
    objectCategorizes: ObjectCategorizesType[];
    entityLegend: string;
    attrLegend: string;
    attrItem: string;
    entityItem: string;
}

export interface RadarContainerProps extends CommonProps, _W {}

export interface RadarPreviewProps extends _W {
    class: string;
    style: string;
    styleObject: CSSProperties;
}

export interface VisibilityMap {
    [P in _W]: boolean;
}

export interface ObjectCategorizesType {
    Title: string;
}

export interface ObjectCategorizesVisibilityType {
    Title: boolean;
}
