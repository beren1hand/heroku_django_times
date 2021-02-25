from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Topic
from .models import Expert
from .models import Opinion
from .models import Idea
from .models import Evidence
from .models import Degree
from .models import University
from .models import DegreeTitle
from .models import Expertise

admin.site.register(Topic)
admin.site.register(Expert)
admin.site.register(Opinion)
admin.site.register(Idea)
admin.site.register(Evidence)
admin.site.register(Degree)
admin.site.register(University)
admin.site.register(DegreeTitle)
admin.site.register(Expertise)