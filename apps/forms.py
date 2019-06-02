class FormMixin:
    def get_errors(self):
        if hasattr(self,'errors'):
            errors = self.errors.get_json_data()
            new_errors = {}
            for key,message_dicts in errors.items():
                messages=[]
                for message in message_dicts:
                    messages.append(message)
                new_errors[key]=messages
            return new_errors
        else:
            return {}