from django import template

from forum.views import pre_format

register = template.Library()


@register.filter
def pre(value):
    return pre_format(value)
