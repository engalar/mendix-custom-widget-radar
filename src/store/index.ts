import DataSet from "@antv/data-set";
import { getReferencePart } from "@jeltemx/mendix-react-widget-utils";
import { computed, configure, makeObservable, observable, when } from "mobx";
import { RadarContainerProps } from "../../typings/RadarProps";
import { RadarLegend } from "./objects/OptionItem";

configure({ enforceActions: "observed", isolateGlobalState: true, useProxies: "never" });

export class Store {
    sub?: mx.Subscription;
    /**
     * dispose
     */
    public dispose() {}

    constructor(public mxOption: RadarContainerProps) {
        makeObservable(this, { mxOption: observable, legends: observable, legendMap: observable, data: computed });
        this.categorizes = mxOption.objectCategorizes.map(d => d.Title);

        when(
            () => !!this.mxOption.mxObject,
            () => {
                this.update();

                this.sub = mx.data.subscribe(
                    {
                        guid: this.mxOption.mxObject!.getGuid(),
                        callback: () => {
                            this.update();
                            //等待视图刷新
                            setTimeout(() => {
                                this.drawSelection();
                            }, 1);
                        }
                    },
                    //@ts-ignore
                    this.mxOption.mxform
                );
            },
            {
                onError(e) {
                    console.error(e);
                }
            }
        );
    }
    legendMap = new Map<string, RadarLegend>();
    legends: RadarLegend[] = [];
    categorizes: string[];
    public get data(): any[] {
        const rawData = this.categorizes.map((item, idxCategorize) => {
            const dateItem: any = { item };
            this.legends.forEach((v, idxLegend) => {
                dateItem[idxLegend.toString()] = v.items[idxCategorize].value;
            });
            return dateItem;
        });

        const { DataView } = DataSet;
        const dv = new DataView().source(rawData);
        dv.transform({
            type: "fold",
            fields: this.legends.map((_, idx) => idx.toString()), // 展开字段集
            key: "user", // key字段
            value: "score" // value字段
        });

        return dv.rows;
    }

    update() {
        const legendGuids = this.mxOption.mxObject!.getReferences(
            getReferencePart(this.mxOption.entityLegend, "referenceAttr")
        );
        legendGuids.forEach(guid => {
            if (!this.legendMap.has(guid)) {
                this.legendMap.set(guid, new RadarLegend(guid, this.mxOption));
            }
        });
        this.legends = legendGuids.map(d => this.legendMap.get(d)!);
    }
    drawSelection() {
        throw new Error("Method not implemented.");
    }
}
