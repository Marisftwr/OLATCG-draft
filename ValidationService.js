import { getMessage } from "./MessageService";


const validateIfFieldsAreFilled = (form) => {
    Object.keys(form).forEach(key => {
        if(Array.isArray(form[key])) {
            form[key].forEach(element => {
                validateIfFieldsAreFilled(element);
            });
        }
        if(!form[key] && form[key] != 0){
            throw getMessage('error.validation.fillingFields');
        }
    })
}

const validateSequences = (sequenceType, ...sequences) => {
    let re;

    if(sequenceType.toUpperCase() === 'DNA'){
        re = new RegExp('[atcgATCG]', 'g'); 
    }
    if(sequenceType.toUpperCase() === 'RNA'){
        re = new RegExp('[aucgAUCG]', 'g');
    }
    if(sequenceType.toUpperCase() === 'PROTEIN'){
        re = new RegExp('[acdefghiklmnpqrstvwyACDEFGHIKLMNPQRSTVWY]', 'g');
    }

    if(sequences.find(sequence => sequence.replaceAll(re, ''))){
        throw getMessage('error.valitation.sequences.format');
    }
}

const validateAlignmentForm = (alignmentForm) => {
    validateIfFieldsAreFilled(alignmentForm);
    validateSequences(alignmentForm.biological_sequences[0].type, alignmentForm.biological_sequences[0].bases);
    validateSequences(alignmentForm.biological_sequences[1].type, alignmentForm.biological_sequences[1].bases);

}

const validateSequenceContent = content => {
    let re1 = new RegExp('\\n', 'g');
    let re2 = new RegExp('[atcgATCG]', 'g');
    if(content.replaceAll(re1, '').replaceAll(re2, '').trim().length !== 0){
        throw getMessage('error.validation.sequenceFile.format');
    }
}

const validateTextFileType = file => {
    if(file.type !== 'text/plain'){
        throw getMessage('error.validation.sequenceFile.type');
    }
}

const validateDNASequences = sequences => {
    sequences.forEach(seq => {
        validateSequenceContent(seq.sequence);
    });
}

const ValidationService = {
    validateAlignmentForm: validateAlignmentForm,
    validateIfFieldsAreFilled: validateIfFieldsAreFilled,
    validateTextFileType: validateTextFileType,
    validateDNASequences: validateDNASequences
};

export default ValidationService;