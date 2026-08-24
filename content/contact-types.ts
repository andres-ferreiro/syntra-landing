export interface SelectOption {
  value: string;
  label: string;
}

export interface FieldCopy {
  label: string;
  placeholder?: string;
}

export interface SelectFieldCopy extends FieldCopy {
  options: SelectOption[];
}

export interface PhoneFieldCopy extends FieldCopy {
  invalidMessage: string;
}

export interface ContactDictionary {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    headline: string;
    intro: string;
  };
  workflowPreview: {
    chat: { user: string; ai: string };
    actionsSummary: string;
    actions: { label: string; category: string }[];
  };
  form: {
    sections: {
      contact: string;
      business: string;
      needs: string;
    };
    fields: {
      firstName: FieldCopy;
      lastName: FieldCopy;
      businessName: FieldCopy;
      email: FieldCopy;
      phone: PhoneFieldCopy;
      website: FieldCopy;
      industry: SelectFieldCopy;
      leadVolume: SelectFieldCopy;
      leadSource: SelectFieldCopy;
      currentCrm: FieldCopy;
      channels: SelectFieldCopy;
      mainProblem: FieldCopy;
      automationGoal: FieldCopy;
      teamSize: SelectFieldCopy;
      notes: FieldCopy;
    };
    requiredNote: string;
    back: string;
    next: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successBody: string;
    errorMessage: string;
    validationErrorMessage: string;
  };
  booking: {
    prompt: string;
    linkLabel: string;
    optionalLabel: string;
    postSubmitHeadline: string;
    postSubmitIntro: string;
    unavailable: string;
  };
  directContact: {
    heading: string;
    emailLabel: string;
    phoneLabel: string;
    whatsappLabel: string;
    whatsappMessage: string;
  };
  schedule: {
    meta: {
      title: string;
      description: string;
    };
    headline: string;
    intro: string;
  };
}
