import "moment-timezone";
import _ from "lodash";

const leadsPerStore = (data, cat) => {

  console.log(data)
  console.log(cat)

    const leads = cat.map(category => _.filter(data, function(lead) { 
        if (lead.store.name === category) return lead 
      }).length);

    return leads;
};

export default leadsPerStore;