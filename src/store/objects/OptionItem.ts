import { getReferencePart } from "@jeltemx/mendix-react-widget-utils";
import { computed, makeObservable, observable } from "mobx";
import { _W } from "../../../typings/RadarProps";
import { BaseMxObject } from "./BaseMxObject";

export class OptionItem extends BaseMxObject {
    constructor(guid: string, private option: _W) {
        super(guid);
        makeObservable(this, { value: computed });
        this.update();
        this.onChange = () => {
            this.update();
        };
    }
    update() {
        if (this.mxObject) {
            //todo
        }
    }
    get value(): number {
        return Number(this.mxObject!.get(this.option.attrItem));
    }
}

export class RadarLegend extends BaseMxObject {
    items: OptionItem[] = [];
    label: string = "";
    constructor(guid: string, private option: _W) {
        super(guid);
        makeObservable(this, { items: observable, label: observable });
        this.update();
    }
    update() {
        if (this.mxObject) {
            this.items = this.mxObject
                .getReferences(getReferencePart(this.option.entityItem, "referenceAttr"))
                .map(guid => new OptionItem(guid, this.option));
            this.label = this.mxObject.get(this.option.attrLegend) as string;
        } else {
        }
    }
}
