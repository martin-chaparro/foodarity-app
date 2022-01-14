  import React, { useEffect } from 'react';
 import { useDispatch, useSelector } from 'react-redux';
 import styles from './CompanyVisualizer.module.css';
 import { getCompanies } from '../../redux/actions/CompaniesActions';


export default function CompanyVisualizer () {
    const companies = useSelector( (state) => state.companies.comerce);
    const dispatch = useDispatch();
    
    console.log(companies)
    useEffect(() => {
     dispatch(getCompanies())
    }, [dispatch])


return (
<div className={styles.GeneralProfileImgs}>
<div className={styles.LogoDiv}>
  {/* <p>{companies[0].name}</p> */}
<img src='' alt="logo" />
</div>

<div className={styles.BannerDiv}>
<img src="" alt="Banner" />
</div>
</div>
)
}
