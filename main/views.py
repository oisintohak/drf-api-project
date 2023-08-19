from django.views.generic import TemplateView
import os


class Index(TemplateView):
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['REACT_APP_GMAPS_API_KEY'] = os.environ.get(
            'REACT_APP_GMAPS_API_KEY')
        return context
