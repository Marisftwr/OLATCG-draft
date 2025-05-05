var BASE_URL = process.env.REACT_APP_BACKEND_URL || 'https://spica.eic.cefet-rj.br';

//var API_BASE_PATH = BASE_URL + '/v1/api';
var API_BASE_PATH = BASE_URL + '/v2/olatcg-backend';

//BACKEND ROUTES
const API_ROUTES = {

    //EXPERIMENT
    BASE_EXPERIMENT: API_BASE_PATH + '/experiment/',
    ANALYSIS_FROM_EXPERIMENT_ID: API_BASE_PATH + '/experiment/{experiment_id}/analysis/',

    //ALIGNMENT
    ALIGN: API_BASE_PATH + '/analysis/{analysis_id}/alignment/',

    //TAXONOMY SEARCH
    //OLD
    GET_TAXONOMY_FROM_SEQUENCES: API_BASE_PATH + '/homology/{value}/type',
    GET_TAXONOMY_SEARCH_RECORDS: API_BASE_PATH + '/taxonomySearch/search',
    GET_TAXONOMY_FROM_SEQUENCE: API_BASE_PATH + '/taxonomySearch/getTaxonomyNameFromSequenceId',
    BLASTN: API_BASE_PATH + '/taxonomySearch/getTaxonomyFromSequence',

    //NEW
    HOMOLOGY: API_BASE_PATH + '/analysis/{id}/homology/',

    //PHYLOGENY
    //OLD
    GET_NEWICK_FROM_TAXONOMY: API_BASE_PATH + '/phylogeny/getNewickFromTaxonomy',
    
    //NEW
    PHYLOGENETIC_TREE: API_BASE_PATH + '/analysis/{id}/tree/',

    //ANALYSIS
    GET_ANALYSIS: API_BASE_PATH + '/analysis/',
    GET_ANALYSIS_BY_ID: API_BASE_PATH + '/analysis/{id}/',
    GET_ANALYSIS_BY_TYPE: API_BASE_PATH + '/analysis/?filter[type]={analysis_type}',

    //OLD
    SEARCH_ANALYSIS_BY_TYPE: API_BASE_PATH + '/analysis/{value}/type',
};



module.exports = {API_ROUTES: API_ROUTES}