import React, { useEffect, useState } from "react";
import { ApiClient, useTranslation } from "adminjs";
import { Text, H5 } from "@adminjs/design-system";
import { Chart } from "react-google-charts";
import _ from "lodash";
import { Card } from "../styles";

/*const data = [
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
];*/

const api = new ApiClient();

const makeChartData = (records) => {
    if(records.lenght == 0) return;

    const status = {
        backlog: 'Backlog',
        doing: 'Em Execução',
        done: 'Pronto',
        approved: 'Aprovado',
        rejected: 'Rejeitado',
    };

    const values = _.groupBy(records, (record) => record.params.status);
    const data = _.map(status, (value, key) => [
        value,
        values[key]?.length || 0
    ]);

    return [["Tipo de tarefa", "Quantidade"], ...data];
}

const TaskType = () => {
    const { translateMessage } = useTranslation();

    const [chartData, setChartData] = useState('[]');
    const [loading, setLoading] = useState(true);
    const [isEmpty, setIsEmpty] = useState(true);

    useEffect(() => {
        (async () => {
            const response = await api.resourceAction({
                resourceId: "tasks",
                actionName: "list",
            });

            console.log("apiRes", response);
            

            setChartData(makeChartData(response.data.records));
            setIsEmpty(response.data.records.length == 0);
            setLoading(false);
        })();
    }, []);

    if(loading) {
        return <></>
    }

    return (
        <Card as="a" href="#">
            <Text textAlign="center">
                <H5>{translateMessage("taskTypeCardTitle")}</H5>
                {
                    isEmpty ? (<Text>Sem tarefas</Text>) :
                        (<Chart
                            chartType="PieChart"
                            data={chartData}
                            width={"100%"}
                            height={"100%"}
                        />
                )}
            </Text>
        </Card>
    );
};

export default TaskType;