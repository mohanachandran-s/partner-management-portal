import { useState, useEffect } from "react";
import DropdownComponent from '../common/fields/DropdownComponent.js';
import DropdownWithSearchComponent from "../common/fields/DropdownWithSearchComponent.js";
import { useTranslation } from 'react-i18next';
import { createDropdownData } from "../../utils/AppUtils.js";

function FtmListFilter({ filteredFtmList, onFilterChange }) {
    const { t } = useTranslation();
    const [partnerIdData, setPartnerIdData] = useState([]);
    const [makeData, setMakeData] = useState([]);
    const [modelData, setModelData] = useState([]);
    const [statusData, setStatusData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setPartnerIdData(createDropdownData('partnerId', '', true, filteredFtmList, t, t('ftmList.selectPartnerId')));
            setMakeData(createDropdownData('make', '', true, filteredFtmList, t, t('ftmList.selectMakeName')));
            setModelData(createDropdownData('model', '', true, filteredFtmList, t, t('ftmList.selectModelName')));
            setStatusData(createDropdownData('status', '', true, filteredFtmList, t, t('ftmList.selectStatus')));
        };
        fetchData();
    }, []);

    const onFilterChangeEvent = (fieldName, selectedFilter) => {
        onFilterChange(fieldName, selectedFilter);
    }

    const styles = {
        dropdownButton: "!text-[#343434] min-w-72"
    }
    return (
        <>
            <div className="flex w-full p-2 justify-start bg-[#F7F7F7] flex-wrap">
                <DropdownComponent
                    fieldName='partnerId'
                    dropdownDataList={partnerIdData}
                    onDropDownChangeEvent={onFilterChangeEvent}
                    fieldNameKey='ftmList.partnerId'
                    placeHolderKey='ftmList.selectPartnerId'
                    styleSet={styles}
                    isPlaceHolderPresent={true}>
                </DropdownComponent>
                <DropdownWithSearchComponent 
                    fieldName='make' 
                    dropdownDataList={makeData} 
                    onDropDownChangeEvent={onFilterChangeEvent} 
                    fieldNameKey='ftmList.make' 
                    placeHolderKey='ftmList.selectMakeName'
                    searchKey='commons.search'
                    styleSet={styles}
                    isPlaceHolderPresent={true}>
                </DropdownWithSearchComponent>
                <DropdownWithSearchComponent
                    fieldName='model'
                    dropdownDataList={modelData}
                    onDropDownChangeEvent={onFilterChangeEvent}
                    fieldNameKey='ftmList.model'
                    placeHolderKey='ftmList.selectModelName'
                    searchKey='commons.search'
                    styleSet={styles}
                    isPlaceHolderPresent={true}>
                </DropdownWithSearchComponent>
                <DropdownComponent 
                    fieldName='status' 
                    dropdownDataList={statusData} 
                    onDropDownChangeEvent={onFilterChangeEvent} 
                    fieldNameKey='ftmList.status' 
                    placeHolderKey='ftmList.selectStatus'
                    styleSet={styles}
                    isPlaceHolderPresent={true}> 
                </DropdownComponent>
            </div>
        </>
    )
}

export default FtmListFilter;