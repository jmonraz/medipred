
import './Dashboard.css';
import OverlayBox from "../../components/OverlayBox";
import GraphBox from "../../components/GraphBox";
import CustomChart from '../../components/CustomChart/CustomChart';
import CustomPieChart from '../../components/CustomPieChart/CustomPieChart';

const Dashboard = () => {
    return (
        <>
            <OverlayBox>
                <div className="flex-box">
                    <GraphBox><CustomChart /></GraphBox>
                    <GraphBox><CustomPieChart /></GraphBox>
                </div>
                <div className="flex-box">
                    {/*code here for table*/}
                    <GraphBox>GRAPH 3</GraphBox>
                </div>
            </OverlayBox>
        </>
    )
}

export default Dashboard;