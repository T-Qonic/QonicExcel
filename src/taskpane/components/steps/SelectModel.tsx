import React, {useCallback} from 'react';
import ProjectDropdown from "../elements/ProjectDropdown";
import {useModels, useProjects} from "../../utils/api";
import {ModelList} from "../elements/ModelList";
import {NoProjectSelected} from "../elements/NoProjectSelected";
import {Steps} from "../../utils/steps";
import {useWorksheetContext} from "../../providers/WorksheetProvider";
import {ButtonOverlay} from "../elements/ButtonOverlay";

export const SelectModel = () => {
    const {activeWorkSheet: {selectedModel: {projectId, modelId}}, updateWorksheetState} = useWorksheetContext();
    const {data: models, isLoading: isLoadingModels} = useModels(projectId);
    const {data: projects, isLoading: isLoadingProjects} = useProjects();

    const onChooseModel = useCallback(() => {
        updateWorksheetState({currentStep: Steps.LOAD_DATA_FILTERS});
    }, [updateWorksheetState]);

    const onChangeModel = useCallback((projectId: string, modelId: string, name: string) => {
        updateWorksheetState({selectedModel: {projectId, modelId, name}});
    }, [updateWorksheetState]);


    return (
        <div className="mt-5">
            <div className="mb-4">
                <h2 className="font-semibold mb-2">Select project</h2>
                <ProjectDropdown isLoadingProjects={isLoadingProjects} projects={projects} onSelectProject={(projectId) => onChangeModel(projectId, undefined, undefined)} projectId={projectId}/>
            </div>

            <div>
                <h2 className="font-semibold mb-2">Select model</h2>
                {!projectId ? (
                    <NoProjectSelected/>
                ) : (
                    <ModelList isLoadingModels={isLoadingModels} models={models ?? []} onChange={(model) => onChangeModel(projectId, model.id, model.name)} modelId={modelId}/>
                )}
            </div>

            <ButtonOverlay onPress={() => onChooseModel()} isDisabled={!modelId} label="Choose model"/>
        </div>
    );
};
