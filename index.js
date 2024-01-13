import Bourne from '@hapi/bourne';
import got from "got"


const initYogoshapi = (apiUsername,apikey)=>{

    const apiToken = Buffer.from(apiUsername+':'+apikey).toString('base64')

    const options = {
        prefixUrl: 'https://api.yogosha.com/api',
        headers: {
            Authorization: 'Basic '+apiToken,
        },
    };

    const apiClient = got.extend(options);


    function printUsername(){
        return apiUsername+':'+apikey;
    }

    async function getReports(){
        let datas = await apiClient.get('reports');
        return Bourne.parse(datas.body);
    }

    async function getAllReports(){
        let apiCalls = apiClient.paginate('reports?embed=author,close,content,doublechecks,feedbackToOrganization,feedbackToResearcher,fix,organization,program,review,reward,vulnerability,history,remediation',{        pagination: {
                paginate: ({response, currentItems}) => {
                    // If there are no more data, finish.
                    if (currentItems.length === 0) {
                        return false;
                    }
                    //console.log(response)
        
                    // Get the current page number.
                    let previousPage = Bourne.parse(response.body).pagination.page;

                    //console.log(previousPage);
        
                    // Update the page number by one.
                    return {
                        searchParams: {
                            page: previousPage + 1
                        }
                    };
                },
                // Using `Bourne` to prevent prototype pollution.
                transform: response => Bourne.parse(response.body).data,
                // filter: ({item}) => {
                //     // Check if the commit time exceeds our range.
                //     const date = new Date(item.commit.committer.date);
                //     const end = date.getTime() - max >= 0;
        
                //     return end;
                // },
                // shouldContinue: ({item}) => {
                //     // Check if the commit time exceeds our range.
                //     const date = new Date(item.commit.committer.date);
                //     const end = date.getTime() - max >= 0;
        
                //     return end;
                // },
            }
        });

        const results = [];
        for await (const apiCall of apiCalls) {
                results.push(apiCall);
                //console.log(apiCall);
        }
        return results;
    }

    async function getNonReviewedReports(){
        let apiCalls = apiClient.paginate('reports?status=review.new&embed=author,close,content,doublechecks,feedbackToOrganization,feedbackToResearcher,fix,organization,program,review,reward,vulnerability,history,remediation',{ 
            pagination: {
                paginate: ({response, currentItems}) => {
                    // If there are no more data, finish.
                    if (currentItems.length === 0) {
                        return false;
                    }
                    //console.log(response)
        
                    // Get the current page number.
                    let previousPage = Bourne.parse(response.body).pagination.page;

                    //console.log(previousPage);
        
                    // Update the page number by one.
                    return {
                        searchParams: {
                            page: previousPage + 1
                        }
                    };
                },
                // Using `Bourne` to prevent prototype pollution.
                transform: response => Bourne.parse(response.body).data,
                // filter: ({item}) => {
                //     // Check if the commit time exceeds our range.
                //     const date = new Date(item.commit.committer.date);
                //     const end = date.getTime() - max >= 0;
        
                //     return end;
                // },
                // shouldContinue: ({item}) => {
                //     // Check if the commit time exceeds our range.
                //     const date = new Date(item.commit.committer.date);
                //     const end = date.getTime() - max >= 0;
        
                //     return end;
                // },
            }
        });
        const results = [];
        for await (const apiCall of apiCalls) {
                results.push(apiCall);
                //console.log(apiCall);
        }
        return results;
    }

    async function getReport(id){
    let datas = await apiClient.get('reports/'+id+'?embed=author,close,content,doublechecks,feedbackToOrganization,feedbackToResearcher,fix,organization,program,review,reward,vulnerability,history,remediation');
    return Bourne.parse(datas.body);
    }

    async function getReportsByProgram(program){
        let apiCalls = apiClient.paginate('reports?program='+program+'&embed=author,close,content,doublechecks,feedbackToOrganization,feedbackToResearcher,fix,organization,program,review,reward,vulnerability,history,remediation',{ 
            pagination: {
                paginate: ({response, currentItems}) => {
                    // If there are no more data, finish.
                    if (currentItems.length === 0) {
                        return false;
                    }
                    //console.log(response)
        
                    // Get the current page number.
                    let previousPage = Bourne.parse(response.body).pagination.page;

                    //console.log(previousPage);
        
                    // Update the page number by one.
                    return {
                        searchParams: {
                            page: previousPage + 1
                        }
                    };
                },
                // Using `Bourne` to prevent prototype pollution.
                transform: response => Bourne.parse(response.body).data,
                // filter: ({item}) => {
                //     // Check if the commit time exceeds our range.
                //     const date = new Date(item.commit.committer.date);
                //     const end = date.getTime() - max >= 0;
        
                //     return end;
                // },
                // shouldContinue: ({item}) => {
                //     // Check if the commit time exceeds our range.
                //     const date = new Date(item.commit.committer.date);
                //     const end = date.getTime() - max >= 0;
        
                //     return end;
                // },
            }
        });

        const results = [];
        for await (const apiCall of apiCalls) {
                results.push(apiCall);
                //console.log(apiCall);
        }
        return results;
    }

    return {
        printUsername,
        getReports,
        getAllReports,
        getNonReviewedReports,
        getReport,
        getReportsByProgram
    };
}

export default initYogoshapi
