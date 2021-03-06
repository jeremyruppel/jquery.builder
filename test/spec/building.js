describe( 'building nodes', function( )
{
  describe( 'node hierarchy', function( )
  {
    it( 'should start building children of the given node', function( )
    {
      $( '#test' ).build( function( )
      {
        this.h1( );
      } );
      
      expect( $( '#test' ).html( ) ).toEqual( '<h1></h1>' );
    } );
    
    it( 'should build two children of the target node', function( )
    {
      $( '#test' ).build( function( )
      {
        this.h1( ).div( );
      } );
      
      expect( $( '#test' ).html( ) ).toEqual( '<h1></h1><div></div>' );
    } );
    
    it( 'should nest nodes when using blocks', function( )
    {
      $( '#test' ).build( function( )
      {
        this.h1( ).div( function( )
        {
          this.div( function( )
          {
            this.span( );
          } );
          
          this.div( );
        } );
      } );
      
      expect( $( '#test' ).html( ) ).toEqual( '<h1></h1><div><div><span></span></div><div></div></div>' );
    } );
    
    it( 'should nest nodes when using blocks without affecting other contexts', function( )
    {
      $( '#test' ).build( function( )
      {
        this.div( function( )
        {
          this.span( 'hello' );
        } );
        this.div( function( )
        {
          this.span( 'there' );
        } );
      } );
      
      expect( $( '#test' ).html( ) ).toEqual( '<div><span>hello</span></div><div><span>there</span></div>' );
    } );
    
  } );
  
  describe( 'text nodes', function( )
  {
    it( 'should be able to add text to a node', function( )
    {
      $( '#test' ).build( function( )
      {
        this.h1( 'testing!' );
      } );
      
      expect( $( '#test' ).html( ) ).toEqual( '<h1>testing!</h1>' );
    } );
    
    it( 'should be able to add number to a node', function( )
    {
      $( '#test' ).build( function( )
      {
        this.h1( 123 );
      } );
      
      expect( $( '#test' ).html( ) ).toEqual( '<h1>123</h1>' );
    } );
    
    it( 'should be able to add text to more than a node respectively without side effects', function( )
    {
      $( '#test' ).build( function( )
      {
        this.h1( 'testing!' );
        this.h1( 'it works!' );
      } );
      
      expect( $( '#test' ).html( ) ).toEqual( '<h1>testing!</h1><h1>it works!</h1>' );
    } );
  } );
  
  describe( 'node options', function( )
  {
    it( 'should take a hash of options and apply them to the node as attributes', function( )
    {
      $( '#test' ).build( function( )
      {
        this.div( { 'class' : 'active', id : 'testing' } );
      } );

      expect( $( '#test' ).html( ) ).toEqual( '<div class="active" id="testing"></div>' );
    } );
    
    it( 'should be able to accept text as the first parameter and options as the second', function( )
    {
      $( '#test' ).build( function( )
      {
        this.div( 'testing!', { 'class' : 'active' } );
      } );
      
      expect( $( '#test' ).html( ) ).toEqual( '<div class="active">testing!</div>' );
    } );
    
    it( 'should properly associate attributes with respective elements when using options', function( )
    {
      $( '#test' ).build( function( )
      {
        this.div( 123, { 'class' : 'active' } );
        this.div( 456, { 'class' : 'inactive' } );
      } );
      
      expect( $( '#test' ).html( ) ).toEqual( '<div class="active">123</div><div class="inactive">456</div>' );
    } );
    
    it( 'should properly associate attributes with respective elements when using text and options', function( )
    {
      $( '#test' ).build( function( )
      {
        this.div( 'testing!', { 'class' : 'active' } );
        this.div( 'testing!', { 'class' : 'inactive' } );
      } );
      
      expect( $( '#test' ).html( ) ).toEqual( '<div class="active">testing!</div><div class="inactive">testing!</div>' );
    } );
  } );
  
  describe( 'the text method', function( )
  {
    it( 'should be defined', function( )
    {
      $( '#test' ).build( function( )
      {
        expect( this.text ).toBeDefined( );
      } );
    } );
    
    it( 'should add text to the given node', function( )
    {
      $( '#test' ).build( function( )
      {
        this.div( function( )
        {
          this.text( 'testing!' );
        } );
      } );
      
      expect( $( '#test' ).html( ) ).toEqual( '<div>testing!</div>' );
    } );
    
    it( 'should add number as a text to the given node', function( )
    {
      $( '#test' ).build( function( )
      {
        this.div( function( )
        {
          this.text( 123 );
        } );
      } );
      
      expect( $( '#test' ).html( ) ).toEqual( '<div>123</div>' );
    } );
    
    it( 'can add text to a nested node', function( )
    {
      $( '#test' ).build( function( )
      {
        this.div( function( )
        {
          this.h1( function( )
          {
            this.text( 'hello' );
          } );
        } );
      } );
      
      expect( $( '#test' ).html( ) ).toEqual( '<div><h1>hello</h1></div>' );
    } );
    
    it( 'should allow you to add text to a node with children if you so desire', function( )
    {
      $( '#test' ).build( function( )
      {
        this.div( function( )
        {
          this.text( 'before' );
          
          this.span( function( )
          {
            this.text( 'spanned' );
          } );
          
          this.text( 'after' );
        } );
      } );
      
      expect( $( '#test' ).html( ) ).toEqual( '<div>before<span>spanned</span>after</div>' );
    } );
    
    it( 'should append text if called multiple times', function( )
    {
      $( '#test' ).build( function( )
      {
        this.div( function( )
        {
          this.text( 'te' );
          this.text( 'st' );
          this.text( 'in' );
          this.text( 'g!' );
        } );
      } );

      expect( $( '#test' ).html( ) ).toEqual( '<div>testing!</div>' );
    } );
    
    it( 'should return the builder for chaining', function( )
    {
      var builder;
      var result;
      
      $( '#test' ).build( function( )
      {
        builder = this;
        
        result = this.text( 'hello' );
      } );
      
      expect( result ).toBe( builder );
    } );
    
    it( 'should be able to be chained', function( )
    {
      $( '#test' ).build( function( )
      {
        this.div( function( )
        {
          this.text( 'test' ).text( 'ing!' );
        } );
      } );
      
      expect( $( '#test' ).html( ) ).toEqual( '<div>testing!</div>' );
    } );
  } );

  describe( 'the attr method', function( ) 
  {
    it( 'should be defined', function( )
    {
      $( '#test' ).build( function( )
      {
        expect( this.attr ).toBeDefined( );
      } );
    } );
    
    it( 'should add attribute to the given node', function( )
    {
      $( '#test' ).build( function( )
      {
        this.div( function( )
        {
          this.attr( 'do', 'testing!' );
        } );
      } );
      
      expect( $( '#test' ).html( ) ).toEqual( '<div do="testing!"></div>' );
    } );
    
    it( 'should add number as a attribute to the given node', function( )
    {
      $( '#test' ).build( function( )
      {
        this.div( function( )
        {
          this.attr( 'number', 123 );
        } );
      } );
      
      expect( $( '#test' ).html( ) ).toEqual( '<div number="123"></div>' );
    } );
    
    it( 'can add attribute to a nested node', function( )
    {
      $( '#test' ).build( function( )
      {
        this.div( function( )
        {
          this.h1( function( )
          {
            this.attr( 'greetings', 'hello' );
          } );
        } );
      } );
      
      expect( $( '#test' ).html( ) ).toEqual( '<div><h1 greetings="hello"></h1></div>' );
    } );
    
    it( 'should add two attributes to the given node', function( )
    {
      $( '#test' ).build( function( )
      {
        this.div( function( )
        {
          this.attr( 'number', 123 );
          this.attr( 'text', '456' );
        } );
      } );
      
      expect( $( '#test' ).html( ) ).toEqual( '<div number="123" text="456"></div>' );
    } );
    
    it( 'should replace an already defined attribute', function( )
    {
      $( '#test' ).build( function( )
      {
        this.div( function( )
        {
          this.attr( 'hello', 'there' );
          this.attr( 'hello', 'world' );
        } );
      } );
      
      expect( $( '#test' ).html( ) ).toEqual( '<div hello="world"></div>' );
    } );
    
    it( 'should work with the text method', function( )
    {
      $( '#test' ).build( function( )
      {
        this.div( function( )
        {
          this.attr( 'hello', 'world' );
          this.text( 'hi!!!' );
        } );
      } );
      
      expect( $( '#test' ).html( ) ).toEqual( '<div hello="world">hi!!!</div>' );
    } );
    
    it( 'should return the builder for chaining', function( )
    {
      var builder;
      var result;
      
      $( '#test' ).build( function( )
      {
        builder = this;
        
        result = this.attr( 'hello', 'tests' );
      } );
      
      expect( result ).toBe( builder );
    } );
    
    it( 'should be able to be chained', function( )
    {
      $( '#test' ).build( function( )
      {
        this.div( function( )
        {
          this.attr( 'one', 'test' ).attr( 'two', 'awesome' );
        } );
      } );
      
      expect( $( '#test' ).html( ) ).toEqual( '<div one="test" two="awesome"></div>' );
    } );
  } );

  describe( 'the input node ', function( )
  {
    
    it( 'should apply the type attr on creation', function( )
    {
      $( '#test' ).build( function( ) 
      {
        this.input( { type: 'text', name: 'foo' } );
        this.input( { type: 'hidden', name: 'bar' } );
      } );
      
      expect( $( '#test' ).html( ) ).toEqual( '<input type="text" name="foo"><input type="hidden" name="bar">' );
    } );
    
    it( 'should apply the type attr on creation when using expressions', function( )
    {
      $( '#test' ).build( function( ) 
      {
        this( 'input', { type: 'text', name: 'foo' } );
        this( 'input', { type: 'hidden', name: 'bar' } );
      } );
      
      expect( $( '#test' ).html( ) ).toEqual( '<input type="text" name="foo"><input type="hidden" name="bar">' );
    } );
  } );
} );