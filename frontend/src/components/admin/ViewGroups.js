
import axios from "axios";
import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import AdminSideBar from "../layout/AdminSideBar";


import Swal from "sweetalert2";


function ViewGroups() {
    const navigate = useNavigate();

    const [groups, setGroups] = useState([]);
    const [noData, setNodata] = useState(false);


    const [searchKeyword, setSearchKeyword] = useState("")

    const filteredGroup = groups.filter((groupName) => {
        return groupName.groupName.toLowerCase().includes(searchKeyword.toLowerCase())
    })


    // const register = () => {
    //     navigate("/registerGroup");
    // };

    const deleteGroup = async (id, idNumber) => {
        await axios
            .delete("http://localhost:4000/api/v1/groups/delete/" + id)
            .then((res) => {
                console.log(res);
            });

        await axios
            .delete("http://localhost:4000/api/v1/users/deleteByUserID/" + idNumber)
            .then((res) => {
                console.log(res);
            });
        loadGroup();
    };

    const loadGroup = () => {
        axios
            .get("http://localhost:4000/api/v1/groups/")
            .then((res) => {
                setGroups(res.data);
                if (res.data.length == 0) {
                    setNodata(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        async function getGroups() {
            const { data } = await axios.get("http://localhost:4000/api/v1/groups");

            setGroups(data);
            // axios
            //     .get("http://localhost:5000/api/v1/groups/")
            //     .then((res) => {
            //         setGroups(res.data);
            //         console.log(res);
            //         if (res.data.length == 0) {
            //             setNodata(true);
            //         }
            //     })
            //     .catch((err) => {
            //         console.log(err);
            //     });
        }

        getGroups();

    }, []);


    return (
        <div>

            <div className="row">
                <div className="col-2">
                    {/* IMPORT SIDE NAV HERE */}
                    <AdminSideBar />
                </div>
                <div className="col-10">
                    <input className="mt-5" placeholder="Search By group Name" style={{ width: "15vw", marginLeft: "75%" }}
                        onChange={(e) => {
                            setSearchKeyword(e.target.value)
                        }}
                    />


                    <table className="table container mt-5">
                        <thead>
                            <th>Group ID</th>
                            <th>Group Name</th>
                            <th>First Member</th>
                            <th>Second Member</th>
                            <th>Third Member</th>
                            <th>Fourth Member</th>
                            <th> Update </th>
                            <th> Delete </th>
                        </thead>

                        <tbody>
                            {filteredGroup.map((group) => {
                                return (
                                    <tr key={group._id}>
                                        <td>{group._id}</td>
                                        <td>{group.groupName}</td>
                                        <td>{group.firstMember.idNumber}</td>
                                        <td>{group.secondMember.idNumber}</td>
                                        <td>{group.thirdMember.idNumber}</td>
                                        <td>{group.fourthMember.idNumber}</td>
                                        <td>
                                            <button className="btn btn-warning"
                                                onClick={() => {
                                                    navigate(`update/${group._id}`)
                                                }}
                                            >
                                                UPDATE
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger"
                                                onClick={() => {
                                                    Swal.fire({
                                                        title: "Warning!",
                                                        text: "Do you want to delete the group?",
                                                        icon: "warning",
                                                        showCancelButton: true,
                                                        confirmButtonText: "Ok",
                                                        confirmButtonColor: "#C81E1E",
                                                    }).then((result) => {
                                                        if (result.isConfirmed) {
                                                            deleteGroup(group._id, group.idNumber);
                                                        } else {
                                                        }
                                                    });
                                                }}
                                            >
                                                DELETE
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>



                </div>
            </div>




























            {/*          
            <Container sx={{ mt: 15, p: 2 }}>
                <Typography variant="h4" component="div" gutterBottom>
                    Registered Group Details
                </Typography>
                <Grid justifyContent="flex-start">
             
                </Grid>
                <Card sx={{ m: 5, p: 2 }} raised>
                    <CardContent>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Group ID</TableCell>
                                        <TableCell align="center">Group Name</TableCell>
                                        <TableCell align="center">First Member</TableCell>
                                        <TableCell align="center">Second Member</TableCell>
                                        <TableCell align="center">Third Member</TableCell>
                                        <TableCell align="center">Fourth Member</TableCell>

                                        <TableCell align="center">Update</TableCell>
                                        <TableCell align="center">Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {groups.map((group, key) => (
                                        <TableRow
                                            key={key}
                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}

                                        >{console.log(group.secondMember.idNumber)}
                                            <TableCell align="left">{group._id}</TableCell>
                                            <TableCell align="left">{group.groupName}</TableCell>
                                            <TableCell align="left">{group.firstMember.idNumber}</TableCell>
                                            <TableCell align="left">{group.secondMember.idNumber}</TableCell>
                                            <TableCell align="left">{group.thirdMember.idNumber}</TableCell>
                                            <TableCell align="left">{group.fourthMember.idNumber}</TableCell>


                                            <TableCell align="left">
                                                <Link to={"update/" + group._id} className="edit">
                                                    <Button variant="contained" color="warning">
                                                        Update
                                                    </Button>
                                                </Link>
                                            </TableCell>
                                            <TableCell align="left">
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    onClick={() => {
                                                        Swal.fire({
                                                            title: "Warning!",
                                                            text: "Do you want to delete the user?",
                                                            icon: "warning",
                                                            showCancelButton: true,
                                                            confirmButtonText: "Ok",
                                                            confirmButtonColor: "#C81E1E",
                                                        }).then((result) => {
                                                            if (result.isConfirmed) {
                                                                deleteGroup(group._id, group.idNumber);
                                                            } else {
                                                            }
                                                        });
                                                    }}
                                                >
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <center>{noData ? <p>No Data </p> : null}</center>
                        </TableContainer>
                    </CardContent>
                </Card>
            </Container> */}
        </div>
    );
}

export default ViewGroups;
