export default {
  name: 'Navitem',
  functional: true,
  props: {
    options: {
      type: Array,
      default: () => []
    },
  },
  render: function (h, context) {
    return (
      <div class='nav-right-panel'>
        {
          context.props.options &&
          context.props.options.length > 0 &&
          context.props.options.map(item => <div class="nav-group">
              <s-menu-item
                {
                  ...{
                    attrs: { ...item }
                  }
                }
              >
                { item.icon && <i class={ item.icon }></i>}
                <span slot="title">{ item.name }</span>
              </s-menu-item>
              <div className="nav-group-sub">
                {
                  item.children &&
                  item.children.length > 0 &&
                  item.children.map(submenu => <s-menu-item
                    {
                      ...{
                        attrs: { ...submenu }
                      }
                    }
                  >
                    { submenu.icon && <i class={ submenu.icon }></i>}
                    <span slot="title">{ submenu.name }</span>
                  </s-menu-item>)
                }
              </div>
            </div>)
        }
        
      </div>
    )
  }
}