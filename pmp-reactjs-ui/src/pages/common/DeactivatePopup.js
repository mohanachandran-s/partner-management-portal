import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import LoadingIcon from "../common/LoadingIcon";
import ErrorMessage from "../common/ErrorMessage";
import { getPartnerManagerUrl, handleServiceErrors, isLangRTL } from "../../utils/AppUtils";
import { HttpService } from "../../services/HttpService.js";
import { getUserProfile } from "../../services/UserProfileService.js";
import FocusTrap from "focus-trap-react";

function DeactivatePopup({ closePopUp, popupData, request, headerMsg, descriptionMsg, headerKeyName }) {
    const { t } = useTranslation();
    const isLoginLanguageRTL = isLangRTL(getUserProfile().langCode);
    const [errorCode, setErrorCode] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [dataLoaded, setDataLoaded] = useState(true);

    const cancelErrorMsg = () => {
        setErrorMsg("");
    };

    const closingPopUp = () => {
        document.body.style.overflow = "auto"
        closePopUp()
    };

    const clickOnConfirm = async () => {
        setErrorCode("");
        setErrorMsg("");
        setDataLoaded(false);
        document.body.style.overflow = "auto"
        try {
            let response;
            if (popupData.apiKeyLabel) {
                response = await HttpService.patch(getPartnerManagerUrl(`/partners/${popupData.partnerId}/policy/${popupData.policyId}/apiKey/status`, process.env.NODE_ENV), request, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            } else if (popupData.oidcClientName) {
                response = await HttpService.put(getPartnerManagerUrl(`/oauth/client/${popupData.oidcClientId}`, process.env.NODE_ENV), request, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            } else if (popupData.isDeactivateDevice) {
                response = await HttpService.put(getPartnerManagerUrl(`/partners/deactivateDevice`, process.env.NODE_ENV), request, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            } else if (popupData.isDeactivateSbi) {
                response = await HttpService.put(getPartnerManagerUrl(`/partners/deactivateSbi`, process.env.NODE_ENV), request, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }
            const responseData = response.data;
            if (responseData && responseData.response) {
                window.location.reload();
            } else {
                setDataLoaded(true);
                handleServiceErrors(responseData, setErrorCode, setErrorMsg);
            }
        } catch (err) {
            setDataLoaded(true);
            setErrorMsg(err);
        }
    }

    const styles = {
        loadingDiv: "!py-[35%]"
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-[50%] z-50 font-inter cursor-default">
            <FocusTrap focusTrapOptions={{ initialFocus: false, allowOutsideClick: true }}>
                <div className={`bg-white md:w-[390px] w-[55%] mx-auto rounded-lg shadow-lg h-fit`}>
                    {!dataLoaded && (
                        <LoadingIcon styleSet={styles}></LoadingIcon>
                    )}
                    {dataLoaded && (
                        <div className="relative">
                            {errorMsg && (
                                <div className="flex justify-end">
                                    <div className="flex justify-between items-center w-[55%] min-h-14 bg-[#C61818] rounded-xl p-3 m-2 -mb-5">
                                        <ErrorMessage errorCode={errorCode} errorMessage={errorMsg} clickOnCancel={cancelErrorMsg}></ErrorMessage>
                                    </div>
                                </div>
                            )}
                            <div className={`p-[10%] flex-col text-center justify-center items-center`}>
                                {!isLoginLanguageRTL ?
                                    <p className="text-base leading-snug font-semibold text-black break-words px-[6%]">
                                        {t(headerMsg)} - '{popupData.isDeactivateDevice ? popupData.make + ' - ' + popupData.model : headerKeyName}'?
                                    </p>
                                    : <p className="text-base leading-snug font-semibold text-black break-words px-[6%]">
                                        {t(headerMsg)} - {popupData.isDeactivateDevice ? popupData.make + ' - ' + popupData.model : headerKeyName}
                                    </p>
                                }
                                <p className="text-sm text-[#666666] break-words py-[6%]">
                                    {t(descriptionMsg)} {popupData.isDeactivateSbi && <span className="font-bold break-words">{t('deactivateSbi.devicesMapped')}</span>} {popupData.isDeactivateSbi && t('deactivateSbi.description2')}
                                </p>
                                {popupData.isDeactivateSbi &&
                                    (<div className="bg-[#FFF7E5] py-1 px-0.5 border-2 break-words border-[#EDDCAF] rounded-md w-full">
                                        <p className="text-sm font-inter text-[#8B6105]">{t('deactivateSbi.deactivateSbiHint', {devicesCount:popupData.countOfApprovedDevices})} {!isLoginLanguageRTL && t('!')}</p>
                                    </div>)
                                }
                                <div className="flex flex-row items-center justify-center space-x-3 pt-[4%]">
                                    <button onClick={() => closingPopUp()} type="button" className="w-40 h-12 border-[#1447B2] border rounded-md text-tory-blue text-sm font-semibold">{t('requestPolicy.cancel')}</button>
                                    <button onClick={() => clickOnConfirm()} type="button" className={`w-40 h-12 border-[#1447B2] border rounded-md bg-tory-blue text-white text-sm font-semibold ${isLoginLanguageRTL && '!mr-3'}`}>{t('deactivateOidcClient.confirm')}</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </FocusTrap>
        </div>
    )

}

export default DeactivatePopup;