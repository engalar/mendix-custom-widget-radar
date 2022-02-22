import { createElement, useEffect, useRef } from "react";
import { Chart } from '@antv/g2';

import { Store } from "../store";
import { autorun } from "mobx";


export interface RadarComponentProps {
    store: Store;
}

export function RadarComponent(props: RadarComponentProps) {


    const ref = useRef<any>();
    useEffect(() => {
        const chart = new Chart({
            container: ref.current,
            autoFit: true,
            height: 500,
        });
        // chart.scale('score', {
        //     min: 0,
        //     max: 80,
        // });
        chart.coordinate('polar', {
            radius: 0.8,
        });
        chart.tooltip({
            shared: true,
            showCrosshairs: true,
            crosshairs: {
                line: {
                    style: {
                        lineDash: [4, 4],
                        stroke: '#333'
                    }
                }
            }
        });
        chart.axis('item', {
            line: null,
            tickLine: null,
            grid: {
                line: {
                    style: {
                        lineDash: null,
                    },
                },
            },
        });
        chart.axis('score', {
            line: null,
            tickLine: null,
            grid: {
                line: {
                    type: 'line',
                    style: {
                        lineDash: null,
                    },
                },
            },
        });

        chart
            .line()
            .position('item*score')
            .color('user')
            .size(2);
        chart
            .point()
            .position('item*score')
            .color('user')
            .shape('circle')
            .size(4)
            .style({
                stroke: '#fff',
                lineWidth: 1,
                fillOpacity: 1,
            });
        chart
            .area()
            .position('item*score')
            .color('user');
        // chart.render();

        autorun(() => {
            chart.data(props.store.data);
            chart.render();
        })

        return () => {
        }
    }, [])

    return (
        <div ref={ref}></div>
    );
}
