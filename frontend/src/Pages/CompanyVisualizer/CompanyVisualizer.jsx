  import React, { useEffect } from 'react';
 import { useDispatch, } from 'react-redux';
 import styles from './CompanyVisualizer.module.css';
 import { getCompanies } from '../../redux/actions/CompaniesActions';


export default function CompanyVisualizer () {
    // const companies = useSelector( (state) => state.companies.comerce);
    const dispatch = useDispatch();
    
    
    useEffect(() => {
     dispatch(getCompanies())
    }, [dispatch])


return (
<div className={styles.GeneralProfileImgs}>
<div className={styles.LogoDiv}>
    {/* <p>{companies.name}</p> */}
<img src='' alt="logo" />
</div>

<div className={styles.BannerDiv}>
<img src="" alt="Banner" />
</div>
</div>
)
}
