import { useNavigate } from 'react-router-dom';
import PoliciesList from "./PoliciesList";

function AuthPoliciesList () {
    const navigate = useNavigate('');

    const createAuthPolicy = () => {
        localStorage.setItem('policyType', 'Auth');
        navigate('/partnermanagement/admin/policy-manager/create-auth-policy');
    };

    const viewAuthPolicy = (selectedPolicy) => {
        const requiredData = {
            policyId: selectedPolicy.policyId,
            header: 'viewAuthPoliciesList.viewAuthPolicy',
            subTitle: 'viewAuthPoliciesList.listOfAuthenticationPolicies',
            backLink: '/partnermanagement/admin/policy-manager/auth-policies-list'
        }
        localStorage.setItem('selectedPolicyData', JSON.stringify(requiredData));
        navigate('/partnermanagement/admin/policy-manager/view-auth-policy');
    };
    
    return (
        <PoliciesList
            policyType = 'auth'
            createPolicyButtonName = 'policiesList.createAuthPolicy'
            createPolicy = {createAuthPolicy}
            subTitle = 'policiesList.listOfAuthPolicies'
            fetchDataErrorMessage = 'policiesList.errorInAuthPolicies'
            viewPolicy = {viewAuthPolicy}>
        </PoliciesList>
    );
}

export default AuthPoliciesList;